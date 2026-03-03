/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function MealDetailsPage() {
  const { id } = useParams()
  const [meal, setMeal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!id) return
    const fetchMeal = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/meals/${id}`)
        const data = await res.json()
        setMeal(data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMeal()
  }, [id])

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existing = cart.find((item: any) => item.mealId === meal.id)
    if (existing) existing.quantity += quantity
    else cart.push({ mealId: meal.id, title: meal.title, price: meal.price, quantity })
    localStorage.setItem("cart", JSON.stringify(cart))
    alert(`${meal.title} added to cart!`)
  }

  if (loading) return <p className="p-10 text-center">Loading...</p>
  if (!meal) return <p className="p-10 text-center">Meal not found</p>

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link href="/" className="text-sm text-gray-500 hover:text-black">← Back to Home</Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        {/* Image */}
        <div className="relative w-full h-[350px] bg-gray-100 rounded-xl overflow-hidden">
          {meal.image ? (
            <Image src={meal.image} alt={meal.title} fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">{meal.title}</h1>
            <p className="text-gray-500 mb-2">
              Restaurant: <span className="font-medium text-gray-700">{meal.provider?.restaurantName}</span>
            </p>
            <p className="text-2xl font-semibold text-green-600 mb-4">৳ {meal.price}</p>
            <p className="text-gray-700 leading-relaxed">{meal.description}</p>
            <p className="mt-4">
              Status: <span className={`font-semibold ${meal.isAvailable ? "text-green-600" : "text-red-600"}`}>
                {meal.isAvailable ? "Available" : "Unavailable"}
              </span>
            </p>
          </div>

          {/* Cart Section */}
          <div className="mt-6 border-t pt-6">
            <div className="flex items-center gap-4 mb-4">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 bg-gray-200 rounded">-</button>
              <span className="text-lg font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 bg-gray-200 rounded">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!meal.isAvailable}
              className={`w-full py-3 rounded-lg text-white font-semibold ${meal.isAvailable ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}
            >
              {meal.isAvailable ? `Add to Cart - ৳ ${meal.price * quantity}` : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}