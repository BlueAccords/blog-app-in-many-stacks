class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an null session.
  protect_from_forgery with: :null_session


  #before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  # This is needed to allow extra parameters in the sign up process for devise
  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.for(:sign_up) << :name
  #   devise_parameter_sanitizer.for(:sign_up) << :provider
  #   devise_parameter_sanitizer.for(:sign_up) << :uid
  # end  
end
