# -*- encoding: utf-8 -*-
# stub: memory_test_fix 1.2.2 ruby lib

Gem::Specification.new do |s|
  s.name = "memory_test_fix"
  s.version = "1.2.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Matijs van Zuijlen", "Chris Roos", "Geoffrey Grosenbach", "Kakutani Shintaro", "Erik Hanson and Matt Scilipoti", "Greg Weber", "Stephan Zalewski"]
  s.date = "2014-09-09"
  s.description = "    Makes use of SQLite3 in-memory database possible for your\n    Rails tests by preloading the schema.\n"
  s.email = "matijs@matijs.net"
  s.extra_rdoc_files = ["README.md"]
  s.files = ["README.md"]
  s.homepage = "http://wiki.github.com/mvz/memory_test_fix"
  s.licenses = ["MIT"]
  s.rdoc_options = ["--main", "README.md"]
  s.rubygems_version = "2.2.2"
  s.summary = "Use SQLite3 in-memory database for Rails tests."

  s.installed_by_version = "2.2.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<railties>, ["< 4.99.0", ">= 3.2.0"])
      s.add_runtime_dependency(%q<activerecord>, ["< 4.99.0", ">= 3.2.0"])
      s.add_development_dependency(%q<rake>, ["~> 10.2"])
      s.add_development_dependency(%q<minitest>, ["~> 5.2"])
      s.add_development_dependency(%q<rspec>, ["~> 3.1"])
    else
      s.add_dependency(%q<railties>, ["< 4.99.0", ">= 3.2.0"])
      s.add_dependency(%q<activerecord>, ["< 4.99.0", ">= 3.2.0"])
      s.add_dependency(%q<rake>, ["~> 10.2"])
      s.add_dependency(%q<minitest>, ["~> 5.2"])
      s.add_dependency(%q<rspec>, ["~> 3.1"])
    end
  else
    s.add_dependency(%q<railties>, ["< 4.99.0", ">= 3.2.0"])
    s.add_dependency(%q<activerecord>, ["< 4.99.0", ">= 3.2.0"])
    s.add_dependency(%q<rake>, ["~> 10.2"])
    s.add_dependency(%q<minitest>, ["~> 5.2"])
    s.add_dependency(%q<rspec>, ["~> 3.1"])
  end
end
