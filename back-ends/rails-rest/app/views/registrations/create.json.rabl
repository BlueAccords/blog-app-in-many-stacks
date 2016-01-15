object false

node(:user) {
  partial('registrations/user-base', :object => @user)
}

node(:token) { @auth_token}