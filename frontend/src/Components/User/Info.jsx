import React from 'react'
import { Link } from 'react-router-dom';
const Info = () => {

  
  return (
    <div className=" py-12">
      <div className="container mx-auto px-4">
        
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-gray-700 mb-6 text-center">
          Welcome to our recipe-sharing community! At RecipeHub, we're passionate
          about cooking and exploring delicious recipes from around the world.
          Our platform brings together food enthusiasts, home chefs, and culinary
          experts to share their favorite recipes, tips, and cooking experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Plenty of Recipes"
            description="Explore a wide variety of recipes ranging from classic dishes to innovative creations."
          />
          <Link to='/offer'>
          
          <FeatureCard
            title="Premium Membership"
            description="Unlock exclusive premium content, advanced features, and personalized recipe recommendations."
          />
          </Link>
          <FeatureCard
            title="Private Recipe Adding"
            description="Create and save your private recipes, accessible only to you. Share them with friends and family when you're ready."
          />
          <FeatureCard
            title="Revenue Sharing"
            description="As a premium member, contribute your own recipes and earn a share of revenue when they're accessed by others."
          />
          <FeatureCard
            title="Social Media-Like Features"
            description="Connect with your friends and share your culinary journey."
          />
          <FeatureCard
            title="Blog-Like Features"
            description="Write and publish your culinary insights, cooking tips, and food-related stories on our integrated blogging platform."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-primary p-6 rounded-lg shadow-md hover:shadow-transparent">
      <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-700 text-center">{description}</p>
    </div>
  );
};


export default Info