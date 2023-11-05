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

export const Image = {
  async upload(images) {
    const formData = new FormData();

    images.map((image) => {
      formData.append(
        "files",
        base64ToFile(image.data_url, image.file?.name, image.file.type)
      );
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
