"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[50vh] md:h-[60vh] text-background">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-background shadow-lg">
            Timeless Elegance, Modern Man
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-background/90">
            Discover our curated collection of fine menswear, crafted for the discerning gentleman.
          </p>
          <Button size="lg" className="mt-8">
            Shop The Collection
          </Button>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">Our Collection</h2>
          <div className="mt-4 w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-6 transition-all duration-300",
                activeCategory === category ? 'text-primary-foreground' : 'text-foreground'
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const image = PlaceHolderImages.find((p) => p.id === product.imageId);
            if (!image) return null;
            return <ProductCard key={product.id} product={product} image={image} />;
          })}
        </div>
      </div>
    </div>
  );
}
