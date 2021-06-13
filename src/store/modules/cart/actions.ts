import { ActionTypes, IProduct } from './types';

export function addProductToCartRequest(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartRequest,
    paylod: {
      product,
    },
  };
}

export function addProductToCartSuccess(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartSuccess,
    paylod: {
      product,
    },
  };
}

export function addProductToCartFailure(productId: number) {
  return {
    type: ActionTypes.addProductToCartFailure,
    paylod: {
      productId,
    },
  };
}
