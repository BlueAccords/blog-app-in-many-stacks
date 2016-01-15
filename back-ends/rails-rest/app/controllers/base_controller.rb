# app/controllers/api/base_controller.rb
class BaseController < ActionController::Base
  include ActionController::ImplicitRender
  respond_to :json

  before_filter :set_secret_key
  before_filter :authenticate_user_from_token!

  # Return the standard error as json But output details to console
  rescue_from StandardError do |exception|
    puts exception
    render custom_err({general: [exception.to_s]})
  end

  protected

  # @params {Hash} errors key value errors
  # @returns Json Object with Errors and Status.
  def custom_err(errors)
    return :json => {
      errors: errors,
      status: 422,
    },
    status: :unprocessable_entity

  end

  # Returns The currently logged in user
  #
  # @returns {ActiveRecord} User instance
  def current_user
    if token_from_request.blank?
      nil
    else
      authenticate_user_from_token!
    end
  end
  alias_method :devise_current_user, :current_user

  # Whether or not the user is logged in.
  #
  # @returns boolean
  def user_signed_in?
    !current_user.nil?
  end
  alias_method :devise_user_signed_in?, :user_signed_in?

  # Whether the current token matches the user's
  # email / password combination.
  #
  # @returns {ActiveRecord} User instance
  def authenticate_user_from_token!
    if claims and user = User.find_by(email: claims[0]['user']) and user.valid_password?(claims[0]['password'])
      @current_user = user
    else
      return render_unauthorized
    end
  end

  # Decodes your username and password from the token
  def claims
    if Rails.env === 'development'
      # In developmment, we don't want JSON web tokens to expire
      return JWT.decode(token_from_request, @secret_key)
    else
      return JWT.decode(token_from_request, @secret_key, true)
    end
  rescue
    nil
  end

  # Endcodes your User and Password into a token that last 2 weeks.
  #
  # @params {string} user hash
  # @params {string} password
  # @returns {string} - The encoded token
  def jwt_token user, password
    if Rails.env === 'development'
      # In developmment, we don't want JSON web tokens to expire
      JWT.encode({:user => user.email, :password => password }, @secret_key, 'HS256')
    else
      # 2 Weeks
      expires = Time.now.to_i + (3600 * 24 * 14)
      JWT.encode({:user => user.email, :password => password, :exp => expires}, @secret_key, 'HS256')
    end
  end

  # Renders an error response if unauthorized
  def render_unauthorized(payload = { errors: { unauthorized: ["You are not authorized perform this action."] } })
    render json: payload.merge(response: { code: 401 }), status: 401
  end

  # Returns a token for the logged in user
  #
  # @returns {string}
  def token_from_request
    # Accepts the token either from the header or a query var
    # Header authorization must be in the following format
    # Authorization: Bearer {yourtokenhere}
    auth_header = request.headers['Authorization'] and token = auth_header.split(' ').last
    if(token.to_s.empty?)
      token = request.parameters["token"]
    end

    token
  end

  #
  # Permission functions
  #

  # Makes sure the current user has edit access to the current manufacturer
  #
  # @params {integer} id The manufacturer ID
  def block_manufacturer_non_editors(id)
    begin
      current_user.manufacturers.find(id)
    rescue
      render_unauthorized errors: {
        permissions: ["You do not have permission to update this resource"]
      }
    end
  end

  # Makes sure the current user has edit access to the editorship
  #
  # @params {integer} id The editorship ID
  def block_editorship_non_editors(id)
    manufacturer_id = Editorship.find(id).manufacturer.id
    block_manufacturer_non_editors(manufacturer_id)

  end

  # Makes sure the current user has edit access to the  available printer.
  #
  # @params {integer} id The avialable printer ID
  def block_available_printer_non_editors(id)
    manufacturer_id = AvailablePrinter.find(id).manufacturer.id
    block_manufacturer_non_editors(manufacturer_id)
  end

  # Makes sure the current user has edit access to the available material
  #
  # @params {integer} id The avialable material ID
  def block_available_material_non_editors(id)
    manufacturer_id = AvailableMaterial.find(id).available_printer.manufacturer.id
    block_manufacturer_non_editors(manufacturer_id)
  end

  # Makes sure the current user has edit access to the available color
  #
  # @params {integer} id The current avialable color ID
  def block_available_color_non_editors(id)
    manufacturer_id = AvailableColor.find(id).available_material.available_printer.manufacturer.id
    block_manufacturer_non_editors(manufacturer_id)
  end

  # Sets the secret key
  def set_secret_key
    @secret_key = ENV["SECRET_KEY_BASE"] ? ENV["SECRET_KEY_BASE"] : 'no key';
  end
end

