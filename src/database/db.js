import axios from 'axios'
import { ToastLongComp } from '../function/ToastFunc';
import { auth } from './authentication'

const addUser = (data) => {
  axios.post(`https://huaweifoodappformyapi.herokuapp.com/api/user`, {
    ...data
  })
    .then(_res => {
      console.log("Account created!");
    }).catch(err => {
      ToastLongComp(err);
    })
}

const initializeData = (setCategories, setPopulars, setIsLoading) => {
  axios.all([
    axios.get('http://huaweifoodappformyapi.herokuapp.com/api/categories'),
    axios.get('http://huaweifoodappformyapi.herokuapp.com/api/products'),
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

const getCart = async ({ setCart, setSubtotal }) => {
  axios.get(`http://huaweifoodappformyapi.herokuapp.com/api/user/id/${auth?.currentUser?.uid}`)
    .then(res => {
      setCart(res.data?.cart);

      let tempSubTotal = 0;
      res.data?.cart?.map(item => {
        tempSubTotal += item.foodPrice * item.orderQuantity;
      })

      setSubtotal(tempSubTotal);
    })
}

const addToCart = (data) => {
  axios.put(`https://huaweifoodappformyapi.herokuapp.com/api/user/id/add/${auth.currentUser?.uid}`, {
    ...data
  })
    .then(_res => {
      ToastLongComp('Added to Cart Successfully!');
    })
}

const removeToCart = (data) => {
  axios.put(`https://huaweifoodappformyapi.herokuapp.com/api/user/id/remove/${auth.currentUser?.uid}`, {
    ...data
  })
    .then(_res => {
      ToastLongComp('Removed to Cart Successfully!');
    })
}

const deleteCart = () => {
  axios.patch(`https://huaweifoodappformyapi.herokuapp.com/api/user/id/${auth.currentUser?.uid}`, {
    cart: []
  })
    .then(_res => {
      console.log('Payment Success!');
    }).catch(err => console.log(err.message));
}


export {
  addUser,
  initializeData, getCategory, getPopular, getDifferentShop, getAllShops, getCart,
  addToCart, removeToCart, deleteCart
}