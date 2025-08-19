import api from "@/plugins/axiosinterceptor";

export const imageUpload = async (file, directory) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("directory", directory);

  try {
    const response = await api.post(
      "/api/image/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );
    return response.data;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    return error.response?.data || null;
  }
};

export default { imageUpload };
