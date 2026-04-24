import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params })
  return response.data
}

export const getProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export const getCategories = async () => {
  const response = await api.get('/categories')
  return response.data
}

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password })
  return response.data
}

export const getCart = async () => {
  const response = await api.get('/cart')
  return response.data
}

export const addToCart = async (productId: string, quantity: number, color?: string) => {
  const response = await api.post('/cart/add', { productId, quantity, color })
  return response.data
}

export const removeFromCart = async (itemId: string) => {
  const response = await api.delete(`/cart/remove/${itemId}`)
  return response.data
}

export const createOrder = async (shippingAddress: any, paymentMethod: string) => {
  const response = await api.post('/orders', { shippingAddress, paymentMethod })
  return response.data
}

export const getMyOrders = async () => {
  const response = await api.get('/orders/my-orders')
  return response.data
}

export default api


