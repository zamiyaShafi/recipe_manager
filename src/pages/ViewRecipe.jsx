import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ViewRecipe() {
  const [expanded, setExpanded] = React.useState(false);
  const [recipe, setRecipe] = useState();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recipe"));
    setRecipe(data);
  }, []);

  console.log(recipe);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (id) => {
    const filtered_data = recipe.filter((item) => {
      return item.recipe_id !== id;
    });

    console.log(filtered_data);
    setRecipe(filtered_data);
    localStorage.setItem("recipe", JSON.stringify(filtered_data));
  };

  return (
    <div
      style={{
        width: "100%",

        marginTop: "20px",
        marginLeft: "50px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {recipe && recipe.length > 0
        ? recipe.map((item) => {
            return (
              <>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={item.title}
                    subheader="September 14, 2016"
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={item.image}
                    src={item.image}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.ingredients}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <Link to={`/edit-recipe/${item.recipe_id}`}>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </Link>

                    <IconButton
                      aria-label="share"
                      onClick={() => handleDelete(item.recipe_id)}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>

                    <Link to={`/single-recipe/${item.recipe_id}`}>
                      <IconButton>
                        <VisibilityIcon style={{ color: "blue" }} />
                      </IconButton>
                    </Link>

                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>{item.instructions}</Typography>

                      <Typography>
                        Set aside off of the heat to let rest for 10 minutes,
                        and then serve.
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </>
            );
          })
        : "No Records Found "}
    </div>
  );
}
