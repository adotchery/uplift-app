import SubmitForm from "../components/forms/submit-form";

export default function Home() {
  console.log("This is the home page")

  return (
    <div className="flex flex-col item-center justify-center p-24">  
      <h1 className="text-4xl font-bold">Uplift</h1>
      <SubmitForm />
    </div>
  );
}
