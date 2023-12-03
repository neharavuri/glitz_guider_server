import axios from "axios";
const Search = (app) => {
    app.get('/search/:index', (req, res) => {
      let i = req.params.index
      let start = 0;
      let end = 20;
      if(i > 0){
        end = end * i;
        start = end - 20;
      }
      axios.get("http://makeup-api.herokuapp.com/api/v1/products.json")
      .then(response => res.json(response.data.slice(start, end).map((e) => ({id: e.id, name: e.name, brand: e.brand, type: e.product_type, image: e.api_featured_image}))));
    })
  }
export default Search;