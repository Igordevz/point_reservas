import mongoose from "mongoose";

export async function AuthenticationDataBase() {
  try {
    await mongoose.connect(
      "mongodb+srv://igortza98483:OBF23vVUJ2kzdjJd@cluster0.loxj2bw.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("authentication true");
  } catch (error) {
    console.log("error system", error);
  }
}
