import { useState } from "react";
import lpImage from "../Images/lp.png";

interface Props {
  onUpload: (file: File) => void; // ProtectedRoute에서 전달
}

export default function ImageUploadButton({ onUpload }: Props) {
  const [preview, setPreview] = useState<string>(lpImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      // 선택 즉시 upload mutation 호출
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <label htmlFor="file-upload" className="cursor-pointer">
        <img
          src={preview}
          alt="upload preview"
          className="object-cover w-70 h-70"
        />
      </label>

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
