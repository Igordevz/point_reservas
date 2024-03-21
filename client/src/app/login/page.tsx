import LoginForm from "./form-SIngIn";


export default function Login() {

 
  return (
    <div className="flex w-full h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-5 w-[90%] sm:w-[500px]">
        <h1 className="text-[25px] sm:text-4xl">
          Login.
        </h1>
      <LoginForm/>
      </div>
    </div>
  );
}
