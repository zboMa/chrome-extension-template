export function evalWindow(str: string) {
  return new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval(str, (result: any, error) => {
      if (error) {
        console.error("evalWindow", error);
        reject(error);
      } else {
        console.log("evalWindow", result);
        resolve(result);
      }
    });
  });
}
