Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'v1/auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  concern :api_base do
    resources :companies do
      resources :divisions do
        resources :projects do
          resources :versions do
            resources :operating_systems do
              resources :libs do
              end
              resources :filedata do
              end
            end
          end
          resources :version_types do
          end
        end
      end
    end
    resources :os_types do
    end
  end

  namespace :v1 do
    concerns :api_base
  end
  
end

