import app from "./app";
import "./database";

//Make server listen
app.listen(app.get("port"), () => {
  console.log("Server on PORT", app.get("port"));
});
