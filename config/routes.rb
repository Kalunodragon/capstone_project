Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/award_bid", to: "bids#award_bid"
  get "/test", to: "employees#test"
  get "/employee", to: "employees#show"
  post "/bid_check", to: "bids#current_exists"

  resources :schedules, only: [:create, :index, :show, :update, :destroy]
  resources :shifts, only: [:create, :index, :show, :update, :destroy]
  resources :bids, only: [:create, :show, :index, :update, :destroy]
  resources :employees, only: [:create, :index, :update, :destroy]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }

  # Defines the root path route ("/")
  # root "articles#index"
end
