class FallbackController < ActionController::Base
  def index
    render file: '%PUBLIC_URL%/index.html'
  end
end