# -*- encoding: utf-8 -*-
# stub: acts_as_api 0.4.2 ruby lib

Gem::Specification.new do |s|
  s.name = "acts_as_api"
  s.version = "0.4.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Christian B\u{e4}uerlein"]
  s.date = "2013-12-28"
  s.description = "acts_as_api enriches the models and controllers of your app in a rails-like way so you can easily determine how your XML/JSON API responses should look like."
  s.email = ["christian@ffwdme.com"]
  s.homepage = "https://github.com/fabrik42/acts_as_api"
  s.rdoc_options = ["--charset=UTF-8"]
  s.rubygems_version = "2.2.2"
  s.summary = "Makes creating XML/JSON responses in Rails 3 easy and fun."

  s.installed_by_version = "2.2.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<activemodel>, [">= 3.0.0"])
      s.add_runtime_dependency(%q<activesupport>, [">= 3.0.0"])
      s.add_runtime_dependency(%q<rack>, [">= 1.1.0"])
      s.add_development_dependency(%q<rails>, [">= 3.2.16"])
      s.add_development_dependency(%q<mongoid>, [">= 3.0.1"])
    else
      s.add_dependency(%q<activemodel>, [">= 3.0.0"])
      s.add_dependency(%q<activesupport>, [">= 3.0.0"])
      s.add_dependency(%q<rack>, [">= 1.1.0"])
      s.add_dependency(%q<rails>, [">= 3.2.16"])
      s.add_dependency(%q<mongoid>, [">= 3.0.1"])
    end
  else
    s.add_dependency(%q<activemodel>, [">= 3.0.0"])
    s.add_dependency(%q<activesupport>, [">= 3.0.0"])
    s.add_dependency(%q<rack>, [">= 1.1.0"])
    s.add_dependency(%q<rails>, [">= 3.2.16"])
    s.add_dependency(%q<mongoid>, [">= 3.0.1"])
  end
end
