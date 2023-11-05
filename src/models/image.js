import axiosInstance from "./axios";

function base64ToFile(base64, fileName, mimeType) {
  // Remove the data URI prefix (e.g., "data:image/jpeg;base64,")
  const base64Data = base64.replace(/^data:([A-Za-z-+/]+);base64,/, "");

  // Create a Blob object from the base64 data
  const blob = new Blob([atob(base64Data)], { type: mimeType });

  // Create a new File object from the Blob
  const file = new File([blob], fileName, { type: mimeType });
  return file;
}

function dataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}

export const Image = {
  async upload(images) {
    const formData = new FormData();

    images.map((image) => {
      formData.append("files", dataURIToBlob(image.data_url), image.file?.name);
    });
    formData.append("type", "product");

    return axiosInstance.post(
      axiosInstance.defaults.baseURL + "ultil/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};
