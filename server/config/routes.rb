Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :companies do
    resources :divisions do
      resources :projects do
        resources :versions do
          resources :oses do
            resources :libs do
            end
            resources :filedata do
            end
          end
        end
      end
    end
  end
end
