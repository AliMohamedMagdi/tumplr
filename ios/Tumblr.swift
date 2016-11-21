//
//  Tumblr.swift
//  Lune
//
//  Created by Andrew Kwon on 5/15/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import OAuthSwift

@objc(Tumblr)

class Tumblr: NSObject {
  
  var oauthswift: OAuth1Swift
  
  override init() {
    let file = Bundle.main.path(forResource: "keys", ofType: "plist")
    let creds = NSDictionary(contentsOfFile: file!)

    self.oauthswift = OAuth1Swift(
      consumerKey:    creds?["key"]! as! String,
      consumerSecret: creds?["sec"]! as! String,
      requestTokenUrl: "https://www.tumblr.com/oauth/request_token",
      authorizeUrl:    "https://www.tumblr.com/oauth/authorize",
      accessTokenUrl:  "https://www.tumblr.com/oauth/access_token"
    )
  }
  
  func creds() -> NSDictionary {
    let file = Bundle.main.path(forResource: "keys", ofType: "plist")
    let keys = NSDictionary(contentsOfFile: file!)
    return keys!
  }
  
  func authenticate(_ callback: @escaping RCTResponseSenderBlock) {
    print("Authenticating...")
    
    self.oauthswift.authorize(
      withCallbackURL: URL(string: "lune://oauth-callback")!,
      success: { credential, response, parameters in
        print("Authorization success!")
        var result = [AnyObject]()
        let values = [
          "oauthToken": credential.oauthToken,
          "oauthTokenSecret": credential.oauthTokenSecret,
          "oauthVerifier": credential.oauthVerifier,
          "oauthRefreshToken": credential.oauthRefreshToken
        ]
        result.append(values as AnyObject)
        callback(result)
      },
      failure: { error in
        print("Shit :(")
        print(error.localizedDescription)
    })

  }
  
}
