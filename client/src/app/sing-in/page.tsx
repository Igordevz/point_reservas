import FormSingIn from "./form-SIngIn";

export default function SingIn() {
  return (
    <div className="flex w-full h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-5 w-[90%] sm:w-[500px]">
        <h1 className="text-[25px] sm:text-4xl">
          Faça seu cadastro em nosso sistema 📝.
        </h1>
        <FormSingIn />
      </div>
    </div>
  );
}
