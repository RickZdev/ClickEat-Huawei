import axios from 'axios'
import { ToastLongComp } from '../function/ToastFunc';

const addUser = (data) => {
  axios.post(`https://huaweifoodappformyapi.herokuapp.com/api/user`, {
    ...data
  })
    .then(_res => {
      ToastLongComp('Added to Cart Successfully!');
    }).catch(err => {
      ToastLongComp(err);
    })
}

const initializeData = (setCategories, setPopulars, setIsLoading) => {
  axios.all([
    axios.get('http://huaweifoodappformyapi.herokuapp.com/api/categories'),
    axios.get('http://huaweifoodappformyapi.herokuapp.com/api/products')
  ])
    .then(
      axios.spread((categories, products) => {
        let tempDb = [];
        categories.data.map(item => {
          tempDb.push(item);
        })
        setCategories(tempDb);

        tempDb = products.data.filter(item => {
          return item.isPopular === true;
        })

        setPopulars(tempDb);
        setIsLoading(false);

      })
    )
}

const getCategory = (setCategories, setIsLoading) => {
  axios.get('http://huaweifoodappformyapi.herokuapp.com/api/categories')
    .then(res => {
      const tempDb = []
      res.data.map(item => {
        tempDb.push(item);
      })
      setCategories(tempDb);
      setIsLoading(false)
    })
}

const getPopular = (setPopulars, setIsLoading) => {
  axios.get('http://huaweifoodappformyapi.herokuapp.com/api/products')
    .then(res => {
      let tempDb = []
      tempDb = res.data.filter(item => {
        return item.isPopular === true;
      })

      setPopulars(tempDb)
      setIsLoading(false)
    })
}

const getDifferentShop = (setAllShops, setRestaurant, setFastFood) => {
  axios.get('http://huaweifoodappformyapi.herokuapp.com/api/shops')
    .then(res => {
      setAllShops(res.data);
      let tempDb = [];
      tempDb = res.data.filter(item => {
        if (item.shopPlace === 'Restaurant') {
          return item;
        }
      })
      setRestaurant(tempDb);

      tempDb = res.data.filter(item => {
        if (item.shopPlace === 'Fastfood') {
          return item;
        }
      })
      setFastFood(tempDb)
    })
}

const getAllShops = (setAllShops) => {
  axios.get('http://huaweifoodappformyapi.herokuapp.com/api/shops')
    .then(res => {
      setAllShops(res.data);
    })
}

const getRestaurant = (setRestaurant) => {
  axios.get('http://huaweifoodappformyapi.herokuapp.com/api/restaurant')
    .then(res => {
      setRestaurant(res.data);
    })
}

const getFastfood = (setFastFood) => {
  axios.get('http://huaweifoodappformyapi.herokuapp.com/api/fastfood')
    .then(res => {
      setFastFood(res.data);
    })
}

const addToCart = (data) => {
  // axios.get('https://huaweifoodappformyapi.herokuapp.com/api/user/id/62c53c2e5a84ab37bb8e4a5a')
  //   .then(res => {
  //     console.log(res.data);
  //   })

  axios.put(`https://huaweifoodappformyapi.herokuapp.com/api/user/id/add/62c53c2e5a84ab37bb8e4a5a`, {
    ...data
  })
    .then(_res => {
      ToastLongComp('Added to Cart Successfully!');
    })
}

export {
  addUser,
  initializeData, getCategory, getPopular, getDifferentShop, getAllShops, getRestaurant, getFastfood,
  addToCart
}