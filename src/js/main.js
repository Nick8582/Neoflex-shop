const headphones = [
  {
    img: "./images/Apple_BYZ_S852I.png",
    title: "Apple BYZ S852I",
    price_old: 3527,
    price: 2927,
    rate: 4.7,
  },
  {
    img: "./images/Apple_EarPods.png",
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
  },
  {
    img: "./images/Apple_EarPods2.png",
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
  },
  {
    img: "./images/Apple_BYZ_S852I.png",
    title: "Apple BYZ S852I",
    price: 2927,
    rate: 4.7,
  },
  {
    img: "./images/Apple_EarPods.png",
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
  },
  {
    img: "./images/Apple_EarPods2.png",
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
  },
];

const wirelessHeadphones = [
  {
    img: "./images/Apple_AirPods.png",
    title: "Apple AirPods",
    price: 9527,
    rate: 4.7,
  },
  {
    img: "./images/GERLAX_GH-04.png",
    title: "GERLAX GH-04",
    price: 6527,
    rate: 4.7,
  },
  {
    img: "./images/BOROFONE_BO4.png",
    title: "BOROFONE BO4",
    price: 7527,
    rate: 4.7,
  },
];
const cartSumIcon = document.querySelector('.header__cart-sum');
let storage = [];
const sessionStorageCart = window.sessionStorage.getItem('cart');
if (JSON.parse(sessionStorageCart) == null) {
  cartSumIcon.innerHTML = 0;
} else {
  cartSumIcon.innerHTML = JSON.parse(sessionStorageCart).length;
  storage = JSON.parse(sessionStorageCart)
}

if (document.querySelector('.catalog')) {
  const catalogContainer = document.querySelector('.catalog__container');

  const containerCategory = (title, content) => {
    const h2 = document.createElement('h2')
    h2.classList.add('catalog__title');
    h2.textContent = title;

    const catalogList = document.createElement('ul');
    catalogList.classList.add('catalog__list');

    content.forEach((item, index) => {
      const card = document.createElement('li');
      card.classList.add('card', 'catalog__item');

      const imgContainer = document.createElement('div');
      imgContainer.classList.add('card__img-container');

      const cardImg = document.createElement('img');
      cardImg.classList.add('card__img');
      cardImg.setAttribute('src', item.img);
      cardImg.setAttribute('alt', item.title);

      const cardDescription = document.createElement('div');
      cardDescription.classList.add('card__description');

      const cardDescriptionTop = document.createElement('div');
      cardDescriptionTop.classList.add('card__description-top');

      const cardName = document.createElement('h3');
      cardName.classList.add('card__name');
      cardName.textContent = item.title;

      const cardPrice = document.createElement('div');
      cardPrice.classList.add('card__price');

      const cardPriceNew = document.createElement('div');
      cardPriceNew.classList.add('card__price-new');
      cardPriceNew.textContent = item.price + ' ₽';
      cardPrice.append(cardPriceNew);

      if (item.price_old) {
        const cardPriceOld = document.createElement('div');
        cardPriceOld.classList.add('card__price-old');
        cardPriceOld.textContent = item.price_old + ' ₽';
        cardPrice.append(cardPriceOld);
      }

      const cardDescriptionBottom = document.createElement('div');
      cardDescriptionBottom.classList.add('card__description-bottom');

      const cardRating = document.createElement('div');
      cardRating.classList.add('card__rating');

      const svgStar = document.createElement('div');
      svgStar.classList.add('card__rating-star');

      const svgUse = document.createElement('img');
      svgUse.setAttribute('src', './images/sprite.svg#star');

      const spanRating = document.createElement('span');
      spanRating.textContent = item.rate;

      const cardBuy = document.createElement('button');
      cardBuy.classList.add('card__buy');
      cardBuy.textContent = 'Купить';

      for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === index) {
          cardBuy.setAttribute('disabled', true);
          cardBuy.textContent = 'В корзине';
        }
      }

      cardBuy.addEventListener('click', (e) => {
        e.preventDefault();
        cardBuy.setAttribute('disabled', true);
        cardBuy.textContent = 'В корзине';
        item.id = index;
        item.sum = 1;
        storage.push(item);
        window.sessionStorage.setItem('cart', JSON.stringify(storage));

        const sessionStorageCart = window.sessionStorage.getItem('cart');
        cartSumIcon.innerHTML = JSON.parse(sessionStorageCart).length;
      })

      card.append(imgContainer)
      imgContainer.append(cardImg);
      card.append(cardDescription);
      cardDescription.append(cardDescriptionTop);
      cardDescriptionTop.append(cardName);
      cardDescriptionTop.append(cardPrice);
      cardDescription.append(cardDescriptionBottom);
      cardDescriptionBottom.append(cardRating);
      cardRating.append(svgStar);
      svgStar.append(svgUse);
      cardRating.append(spanRating);
      cardDescriptionBottom.append(cardBuy);

      catalogList.append(card);
    })

    catalogContainer.append(h2);
    catalogContainer.append(catalogList);
  }

  containerCategory('Наушники', headphones);
  containerCategory('Беспроводные наушники', wirelessHeadphones);
}

if (document.querySelector('.cart')) {
  const container = document.querySelector('.cart__left');
  const cartResultSum = document.querySelector('.cart__result-sum');
  let cartStorageArray = JSON.parse(sessionStorageCart);

  window.sessionStorage.setItem('cart', JSON.stringify(cartStorageArray));
  if (null === JSON.parse(sessionStorageCart) || JSON.parse(sessionStorageCart).length === 0) {
    const messageNull = document.createElement('p');
    messageNull.classList.add('cart__none');
    messageNull.textContent = 'Корзина пуста'
    container.append(messageNull);
    cartResultSum.textContent = '0 ₽';
  } else {
    cartStorageArray = cartStorageArray.filter((n) => {
      return n != null
    });
    cartStorageArray.forEach((item, index) => {

      const cartItem = document.createElement('li');
      cartItem.classList.add('cart__item');

      const cartItemTop = document.createElement('div');
      cartItemTop.classList.add('cart__item-top');

      const cartImg = document.createElement('img');
      cartImg.classList.add('cart__img');
      cartImg.setAttribute('src', item.img);
      cartImg.setAttribute('alt', item.title);

      const cartDescription = document.createElement('div');
      cartDescription.classList.add('cart__description');

      const cartDescriptionText = document.createElement('p');
      cartDescriptionText.classList.add('cart__item-description');
      cartDescriptionText.textContent = item.title;

      const cartDescriptionPrice = document.createElement('span');
      cartDescriptionPrice.classList.add('cart__item-price');
      cartDescriptionPrice.textContent = item.price + ' ₽';

      const cartItemBottom = document.createElement('div')
      cartItemBottom.classList.add('cart__item-bottom');

      const cartItemBtns = document.createElement('div');
      cartItemBtns.classList.add('cart__item-btns');

      const cartBtnMinus = document.createElement('button');
      cartBtnMinus.classList.add('cart__btn-sum', 'cart__btn-sum--minus');

      const cartQuantity = document.createElement('span');
      cartQuantity.classList.add('cart__quantity');
      cartQuantity.textContent = item.sum;

      const cartBtnPlus = document.createElement('button');
      cartBtnPlus.classList.add('cart__btn-sum', 'cart__btn-sum--plus');

      const cartItemResult = document.createElement('span');
      cartItemResult.classList.add('cart__item-result');
      cartItemResult.textContent = item.price + ' ₽';

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('cart__item-del');

      const svgDelete = document.createElement('div');
      svgDelete.classList.add('cart__trash');

      const useDelete = document.createElement('img');
      useDelete.setAttribute('src', 'images/sprite.svg#trash');

      cartBtnMinus.addEventListener('click', (e) => {
        e.preventDefault();
        if (item.sum <= 1) {
          return
        } else {
          cartQuantity.textContent = item.sum - 1;
          cartStorageArray[index].sum = item.sum - 1;
          window.sessionStorage.setItem('cart', JSON.stringify(cartStorageArray));
          cartItemResult.textContent = item.price * Number(cartQuantity.textContent) + ' ₽';
        }
        resultFunction()
      });

      cartBtnPlus.addEventListener('click', (e) => {
        e.preventDefault();
        cartQuantity.textContent = item.sum + 1;
        cartStorageArray[index].sum = item.sum + 1;
        window.sessionStorage.setItem('cart', JSON.stringify(cartStorageArray));
        cartItemResult.textContent = item.price * Number(cartQuantity.textContent) + ' ₽';
        resultFunction()
      })

      deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        delete cartStorageArray[index];
        window.sessionStorage.setItem('cart', JSON.stringify(cartStorageArray));
        cartItem.remove()
        resultFunction()
      })

      cartItemTop.append(cartImg);
      cartItemTop.append(cartDescription);
      cartDescription.append(cartDescriptionText);
      cartDescription.append(cartDescriptionPrice);
      cartItemBottom.append(cartItemBtns);
      cartItemBtns.append(cartBtnMinus);
      cartItemBtns.append(cartQuantity);
      cartItemBtns.append(cartBtnPlus);
      cartItemBottom.append(cartItemResult);

      deleteBtn.append(svgDelete);
      svgDelete.append(useDelete);

      cartItem.append(cartItemTop);
      cartItem.append(cartItemBottom);
      cartItem.append(deleteBtn);
      container.append(cartItem);
      resultFunction()
    })

    function resultFunction() {
      const resultSum = document.querySelector('.cart__result-sum')
      const itemResult = document.querySelectorAll('.cart__item-result');
      let sumResult = 0;
      itemResult.forEach(item => {
        sumResult = sumResult + Number(item.textContent.replace('₽', ''));
      })

      resultSum.textContent = '₽ ' + sumResult
    }
  }

  const formSubmit = document.querySelector('.cart__submit');

  formSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    let fullPrice = 0;
    const cartItem = document.querySelectorAll('.cart__item');
    const cartIcon = document.querySelector('.header__cart-sum');
    console.log('Форма отправлена с товарами:');
    cartStorageArray.forEach(item => {
      console.log(item.title + ': ' + item.sum + 'шт. на сумму ' + (item.price * item.sum) + ' ₽')
      fullPrice = fullPrice + (item.sum * item.price);
    })
    console.log('Итог: ' + fullPrice + ' ₽');
    cartItem.forEach(item => {
      item.remove();
    })
    const messageNull = document.createElement('p');
    messageNull.textContent = 'Корзина пуста'
    messageNull.classList.add('cart__none');
    container.append(messageNull)
    cartIcon.textContent = 0;
    cartResultSum.textContent = '0 ₽';
    sessionStorage.removeItem('cart');
  })
}
