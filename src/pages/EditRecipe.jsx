import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
function EditRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [singleRecipe, setSingleRecipe] = useState("");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recipe"));
    const singleData = data.filter((item) => {
      return item.recipe_id == id;
    });
    setRecipe(data);
    setSingleRecipe(...singleData);
  }, []);
  console.log(recipe);
  console.log(singleRecipe);

  const handleChange = (e) => {
    setSingleRecipe({ ...singleRecipe, [e.target.name]: e.target.name });
  };

  const handleSubmit = () => {
    const data = [...recipe];
    data.splice(id, 1, singleRecipe);
    localStorage.setItem("recipe", JSON.stringify(data));
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="title"
        variant="outlined"
        name="title"
        value={singleRecipe.title}
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="ingredients"
        variant="outlined"
        name="ingredients"
        value={singleRecipe.ingredients}
        onChange={handleChange}
      />
      <Button variant="text" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default EditRecipe;
