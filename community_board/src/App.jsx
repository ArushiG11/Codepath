import './App.css';
import FoodCart from './components/food_carts';

const App = () => {
  const foodTrucks = [
    {
      name: "Birria-Landia",
      cuisine: "Mexican",
      link: "https://thebirrialandia.com/menu/",
      image: "https://pyxis.nymag.com/v1/imgs/38c/2ac/b02a093f6b846ebd1aca78b0d59c7e427a-birria-1.rsocial.w1200.jpg"
    },
    {
      name: "Mysttik Masala",
      cuisine: "Indian",
      link: "https://indianfoodny.com/",
      image: "https://res.cloudinary.com/the-infatuation/image/upload/c_fill,w_1200,ar_4:3,g_auto,f_auto/cms/reviews/mysttik-masala/banners/1561989798.42"
    },
    {
      name: "The Halal Guys",
      cuisine: "Middle Eastern",
      link: "https://thehalalguys.com/menu/",
      image: "https://nypost.com/wp-content/uploads/sites/2/2014/08/081114featureshalaguysbz-1.jpg?quality=75&strip=all&w=1024"
    },
    {
      name: "NY Dosas",
      cuisine: "Vegetarian",
      link: "https://nydosas.com/menu/",
      image: "https://nydosas.com/wp-content/uploads/2018/07/maxresdefault-2-1024x630.jpg"
    },
    {
      name: "Jerk Pan",
      cuisine: "Jamaican",
      link: "https://www.allmenus.com/ny/new-york/360888-jerk-pan/menu/",
      image: "https://infatuation.imgix.net/media/images/reviews/jerk-pan/banners/1561989308.8.jpg"
    },
    {
      name: "Tong",
      cuisine: "Bangladeshi",
      link: "https://www.facebook.com/Bangladeshistreetfoods/",
      image: "https://static01.nyt.com/images/2019/09/04/dining/29hungry-tong2/merlin_159654336_783be212-7726-485e-9250-4793a743af41-jumbo.jpg"
    },
    {
      name: "King Souvlaki of Astoria",
      cuisine: "Greek",
      link: "https://kingsouvlakinyc.com/",
      image: "https://kingsouvlakinyc.com/wp-content/themes/king/images/location-f.jpg"
    },
    {
      name: "Ling's Sweet Mini Cakes",
      cuisine: "Chinese",
      link: "https://canalstreet.market/",
      image: "https://fastly.4sqi.net/img/general/600x600/61129566_7PLEKHNMZ-VNqzYx2jWRVZGrZ42PdPX0M-j9Ftpg8Ts.jpg"
    },
    {
      name: "Uncle Gussy's",
      cuisine: "Greek",
      link: "https://unclegussys.com/menus/",
      image: "https://d3hbe0kmbam4a5.cloudfront.net/photos/67e1cdb7-bc27-4f26-8343-851bfaa7fc22.jpg"
    },
    {
      name: "Patacon Pisao",
      cuisine: "Venezuelan",
      link: "https://www.pataconpisaonyc.com/menus/",
      image: "https://live.staticflickr.com/8088/8400188739_53b16c7d13_z.jpg"
    },
    {
      name: "Mom's Momo",
      cuisine: "Tibetan",
      link: "https://www.restaurantji.com/ny/jackson-heights/moms-momo-/menu/",
      image: "https://infatuation.imgix.net/media/images/reviews/moms-momo/banners/1606245507.888788.png"
    },
    {
      name: "Makina Cafe",
      cuisine: "Ethiopian",
      link: "https://makinacafenyc.com/",
      image: "https://fastly.4sqi.net/img/general/600x600/784042_29bZZHPGisHnWqyIuuXMo8D2zzW7QS6Hft7Vv15SH_I.jpg"
    }
  ];  

  return (
    <div className="App">
      <div className='header'>
        <img src="/assets/awning.png" alt="food truck icon" />
        <h1>Food Truck Favourites</h1>
      </div>
      <div className="food-container">
        {foodTrucks.map((truck, index) => (
          <FoodCart 
            key={index} 
            name={truck.name} 
            cuisine={truck.cuisine} 
            link={truck.link} 
            image={truck.image} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
