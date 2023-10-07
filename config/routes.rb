Rails.application.routes.draw do
  get "/test", to: "employees#test"
  get "/award_bid", to: "bids#award_bid"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  resources :schedules
  resources :shifts
  resources :bids, only: [:create, :show, :update, :destroy]
  resources :employees, only: [:create, :show, :update, :destroy]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
