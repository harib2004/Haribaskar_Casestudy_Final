export const uploadPhotoToS3 = async (file) => {
  const token = localStorage.getItem("token"); 

  try {
    const presignResponse = await fetch(
      `http://localhost:8080/api/v1/images/presign?fileName=${file.name}&contentType=${file.type}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    if (!presignResponse.ok) {
      const errorText = await presignResponse.text();
      throw new Error(`Failed to get upload URL: ${errorText}`);
    }
    
    const uploadUrl = await presignResponse.text();
    const cleanUploadUrl = uploadUrl.replace(/^"|"$/g, '');
    const uploadResponse = await fetch(cleanUploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) throw new Error("S3 Upload failed");

    return cleanUploadUrl.split('?')[0];

  } catch (error) {
    console.error("Upload Error Details:", error);
    throw error;
  }
};