import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = ["Breakfast", "Lunch", "Dinner"];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddRecipe() {
  // 1.state variable for all form data
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  const nav = useNavigate();

  // 2.getting initial value from localstorage
  let initialvalue;
  if (localStorage.getItem("recipe") === null) {
    initialvalue = [];
  } else {
    initialvalue = JSON.parse(localStorage.getItem("recipe"));
  }

  // 3.setting it to state

  const [recipe, setRecipe] = useState(initialvalue);

  console.log(recipe);

  console.log(category);

  // 4.handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    var recipe_id = 101;
    recipe_id =
      recipe.length > 0
        ? recipe[recipe.length - 1]["recipe_id"] + 1
        : recipe_id;

    console.log(recipe_id);

    const new_data = {
      recipe_id: recipe_id,
      title: title,
      category: category,
      ingredients: ingredients,
      instructions: instructions,
      image: image,
    };
    console.log(new_data);

    setRecipe([...recipe, new_data]);

    await localStorage.setItem("recipe", JSON.stringify(recipe));

    alert("Recipe Added Successfully");

    nav("/view-recipe");
  };

  useEffect(() => {
    localStorage.setItem("recipe", JSON.stringify(recipe));
  }, [recipe]);

  // const new_data={
  //   recipe_id:recipe_id,

  // }

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div>
      <h2 style={{ color: "brown", textAlign: "center" }}>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: "70%",
            maxWidth: "100%",
            margin: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <TextField
            fullWidth
            label="Title"
            id="fullWidth"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <FormControl sx={{ m: 0, width: 1050 }}>
            <InputLabel id="demo-multiple-name-label">
              Choose Category
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={category}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
              fullWidth
            >
              {categories.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                  style={getStyles(item, category, theme)}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-multiline-static"
            label="Ingredients"
            multiline
            rows={4}
            fullWidth
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Instructions"
            multiline
            rows={4}
            value={instructions}
            fullWidth
            onChange={(e) => setInstructions(e.target.value)}
          />
          <TextField
            fullWidth
            label="Image Url"
            id="fullWidth"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
          <Button variant="outlined" color="secondary" type="submit">
            Add
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default AddRecipe;
