import app from "./app.js";

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is up and running on PORT 5000");
});
