require "rubygems"
require "bundler/setup"

use Rack::Static,
  :urls => ["/css", "/js", "/img", "/slider", "/examples", "/data"]

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('water.html', File::RDONLY)
  ]
}
