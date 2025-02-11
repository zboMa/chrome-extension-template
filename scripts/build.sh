#!/usr/bin/env bash
# 定义文本的 ANSI 转义序列
RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
BLUE=='\033[34m'
PURPLE='\033[35m' # 洋红
CYAN='\033[36m'
WHITE='\033[37m'

# 定义恢复默认颜色的 ANSI 转义序列
NC='\033[0m' 

echo -e "${PURPLE}Start executing the build operation!${NC}"

# 判断是否存在密钥
if [ -f "./private_key.pem" ]; then
  echo "has private key, run next!"
else
  echo -e "${RED}密钥不存在，请先使用浏览器扩展打包工具，生成密钥${NC}"
  exit 1
fi

# 判断文件名是extension开头的crx文件，则删除
# for file in *; do
#     # 使用正则表达式判断文件名是否以 extension 开头且后缀为 .crx
#     if [[ $file =~ ^extension.*\.crx$ ]]; then
#         echo "Deleting file: $file"
#         rm "$file"
#     fi
# done

# 初始化一个标志变量，用于判断是否传递了 --beta 参数
has_beta=false

# 遍历所有传递给脚本的参数
for arg in "$@"; do
    if [ "$arg" = "--beta" ]; then
        has_beta=true
        break
    fi
done

# 根据标志变量的值执行不同的 npm version 命令
if [ "$has_beta" = false ]; then
    echo -e "${YELLOW}[INFO] publish patch version...${NC}"
    npm version patch
else
    echo -e "${YELLOW}[INFO] publish beta version...${NC}"
    npm version prerelease --preid beta
fi

# 从 package.json 中提取版本号
version=$(grep '"version":' package.json | sed 's/.*"version": "\([^"]*\)".*/\1/')

# 检查是否成功提取版本号
if [ -z "$version" ]; then
    echo -e "${RED}Failed to extract version from package.json.${NC}"
    exit 1
fi

# 如果不是beta版本，同步版本号到 manifest.json
if [ "$has_beta" = false ]; then
    sed -i "s/\"version\": \".*\"/\"version\": \"$version\"/" ./public/manifest.json
    echo "Updated manifest.json with version $version."
fi


# 构建项目
echo "Building project..."
# vite build

# 生成带有版本号的 crx 文件名
crx_filename="extension-$version.crx"

# 打包文件
crx3 -p ./private_key.pem -o "./libs/$crx_filename" ./build

# 检查 crx3 命令是否执行成功
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully created $crx_filename.${NC}"
else
    echo -e "${RED}Failed to create $crx_filename.${NC}"
fi