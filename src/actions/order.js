import {
    LOAD_ORDER,
    LOAD_ERROR,
    COMPLETE_CHECKOUT,
    CONFIRM_ORDER_SUCCESS,
    LOAD_COMPLETED_ORDERS } from '../constants/';

const loadOrderSuccess = (order) => ({
    type: LOAD_ORDER,
    order: order
});

const confirmOrderSuccess = (orders) => ({
    type: CONFIRM_ORDER_SUCCESS,
    order: orders.order,
    newOrder: orders.newOrder
});

const completedOrdersSuccess = (orders) => ({
    type: LOAD_COMPLETED_ORDERS,
    completedOrders: orders
});

export {
    loadOrderSuccess,
    confirmOrderSuccess,
    completedOrdersSuccess
}
