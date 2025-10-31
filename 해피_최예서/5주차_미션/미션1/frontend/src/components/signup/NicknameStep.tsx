export default function NicknameStep({
  register,
  errors,
}: {
  register: any;
  errors: any;
}) {
  return (
    <>
      <input
        {...register("name")}
        type={"text"}
        placeholder="이름"
        className={`text-[black] focus:outline-none border px-8 py-2 rounded-xl mb-2 w-80`}
      />

      {errors?.name && (
        <div className="border-[#e14d36]">{errors.name.message}</div>
      )}
    </>
  );
}
