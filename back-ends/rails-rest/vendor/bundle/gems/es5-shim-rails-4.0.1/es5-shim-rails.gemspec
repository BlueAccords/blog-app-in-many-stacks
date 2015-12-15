# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'es5-shim-rails/version'

Gem::Specification.new do |gem|
  gem.name          = "es5-shim-rails"
  gem.version       = Es5::Shim::Rails::VERSION
  gem.authors       = ["Yousef Ourabi"]
  gem.email         = ["yourabi@gmail.com"]
  gem.description   = %q{Asset gem for es5-shim}
  gem.summary       = %q{Asset gem for es5-shim}
  gem.homepage      = "https://github.com/yourabi/es5-shim-rails"

  gem.add_dependency             'railties',   '>= 3.1'
  gem.add_dependency             'actionpack', '>= 3.1'
  gem.add_development_dependency 'rails', '>= 3.1'

  gem.files         = `git ls-files`.split($/)
  gem.require_paths = ["lib"]
end
