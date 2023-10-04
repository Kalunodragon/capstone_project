Rails.application.routes.draw do
  resources :schedules
  resources :shifts
  resources :bids
  resources :employees, only: [:create, :show, :update, :destroy]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get "/test", to: "employees#test"
end
