# -*- encoding: utf-8 -*-
# stub: es5-shim-rails 4.0.1 ruby lib

Gem::Specification.new do |s|
  s.name = "es5-shim-rails"
  s.version = "4.0.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Yousef Ourabi"]
  s.date = "2014-08-09"
  s.description = "Asset gem for es5-shim"
  s.email = ["yourabi@gmail.com"]
  s.homepage = "https://github.com/yourabi/es5-shim-rails"
  s.rubygems_version = "2.2.2"
  s.summary = "Asset gem for es5-shim"

  s.installed_by_version = "2.2.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<railties>, [">= 3.1"])
      s.add_runtime_dependency(%q<actionpack>, [">= 3.1"])
      s.add_development_dependency(%q<rails>, [">= 3.1"])
    else
      s.add_dependency(%q<railties>, [">= 3.1"])
      s.add_dependency(%q<actionpack>, [">= 3.1"])
      s.add_dependency(%q<rails>, [">= 3.1"])
    end
  else
    s.add_dependency(%q<railties>, [">= 3.1"])
    s.add_dependency(%q<actionpack>, [">= 3.1"])
    s.add_dependency(%q<rails>, [">= 3.1"])
  end
end
