Rails.application.routes.draw do
  resources :tasks
  get 'wellcome/home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'wellcome#home'
end
