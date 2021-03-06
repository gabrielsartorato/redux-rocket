import { all, takeLatest, select, call, put } from 'typed-redux-saga';

import { IState } from '../..';
import api from '../../../services/api';
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from './actions';
import { ActionTypes } from './types';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

function* checkProductStock({ paylod }: CheckProductStockRequest) {
  const { product } = paylod;

  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  const availableStockResponse: any = yield* call(
    api.get,
    `stock/${product.id}`,
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield* put(addProductToCartSuccess(product));
  } else {
    yield* put(addProductToCartFailure(product.id));
  }
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
