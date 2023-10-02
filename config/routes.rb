Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :yougas
      resources :comments
      resources :users, only: [:create]
      post '/login', to: 'users#login'
      delete '/logout', to: 'users#logout'
      resources :exercises, only: [:create, :destroy, :index] do
        collection do
          get 'user_yoga'
        end
      end
    end
  end
end
