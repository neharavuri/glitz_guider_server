import axios from "axios";
const Search = (app) => {
    app.get('/search/:index', (req, res) => {
      let link = "http://makeup-api.herokuapp.com/api/v1/products.json"
      let i = req.params.index
      let start = 0;
      let end = 20;
      if(i > 0){
        end = end * i;
        start = end - 20;
      }
      if (req.query.brand) {
        if (!(link.includes("?"))){
          link = link + "?brand="+req.query.brand
        }
        else{
          link = link + "&brand="+req.query.brand
        }
      }
      if (req.query.product_type) {
        if (!(link.includes("?"))){
          link = link + "?product_type="+req.query.product_type
        }
        else{
          link = link + "&product_type="+req.query.product_type
        }
      }
      if (req.query.min) {
        if (!(link.includes("?"))){
          link = link + "?price_greater_than="+req.query.min
        }
        else{
          link = link + "&price_greater_than="+req.query.min
        }
      }
      if (req.query.max) {
        if (!(link.includes("?"))){
          link = link + "?price_less_than="+req.query.max
        }
        else{
          link = link + "&price_less_than="+req.query.max
        }
      }
      axios.get(link)
      .then(response => res.json(response.data.slice(start, end)
      .map((e) => ({price: e.price, id: e.id, name: e.name, brand: e.brand, type: e.product_type, image: e.api_featured_image}))));
    })
    
    app.get('/product/:id', async (req, res) => {
      let pid = req.params.id
      const response = await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json");
      return res.json(response.data.filter(function (e) {
        return e.id == pid;
      }));
    })
  }
export default Search;