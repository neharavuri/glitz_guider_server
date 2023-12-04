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
      .then(response => res.json(response.data.slice(start, end)
      .filter(function(e) {
        let tf = true;
        if (req.query.brand) {
          tf = tf && (e.brand == req.query.brand);
        }
        if (req.query.product_type) {
          tf = tf && (e.product_type == req.query.product_type);
        }
        if (req.query.min) {
          tf = tf && (e.price >= req.query.min);
        }
        if (req.query.max) {
          tf = tf && (e.price <= req.query.max)
        }
        return tf;
      })
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