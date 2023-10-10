Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/award_bid", to: "bids#award_bid"
  post "/test", to: "employees#test"

  resources :schedules
  resources :shifts
  resources :bids, only: [:create, :show, :update, :destroy]
  resources :employees, only: [:create, :show, :update, :destroy]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
