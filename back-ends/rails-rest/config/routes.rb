Rails.application.routes.draw do

  # By using the format false option, we restrict the api to only serving json
  # It is commen to namespace /api, however we did not to simplify over the many stacks.
  scope :format => false, :defaults => { format: :json} do
    
    #
    # Devise routes (User routes)
    #
    devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
    devise_scope :user do
      post 'sign-in', to: 'sessions#create'
      get '/users/', to: 'registrations#get_user_by_username'
      # SIGN OUT # This should be done with Front-End / Simply remove the token from the client
      delete 'users/:id', to: 'registrations#destroy'
      put 'users/:id', to: 'registrations#update'
      get 'users/:id', to: 'registrations#show'
    end  

    #
    # Posts Routes
    #
    match '/posts', :to => 'posts#create', via: :post
    match '/posts', :to => 'posts#index', via: :get
    match '/posts/:id', :to => 'posts#show', via: :get  
    match '/users/:user_id/posts', :to => 'posts#get_post_by_user', via: :get  
    match '/posts/:id', :to => 'posts#update', via: :put
    match '/posts/:id', :to => 'posts#destroy', via: :delete
  end 

  # 
  # Tag Routes
  #
  match '/tags', :to => 'tags#create', via: :post
  match '/tags', :to => 'tags#index', via: :get
  match '/tags/:id', :to => 'tags#update', via: :put
  match '/tags/:id', :to => 'tags#destroy', via: :delete
  match '/toggle-tag-on-post', :to => 'post_tags#toggle_tag_on_post', via: :post

end
