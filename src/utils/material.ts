interface IAssets {
  components?: any[];
}

const assets: IAssets = {};

export function getAssets() {
  if (assets.components) return assets;

  return new Promise((resolve, reject) => {
    // 获取页面上postMessage的数据
    chrome.devtools.inspectedWindow.eval(
      `window.CramiMaterialsMetaMeta`,
      (result: any, error) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log(result);
          if (result?.components) {
            assets.components = result.components;
          }
        }
        resolve(assets);
      }
    );
  });
}

export { assets };
