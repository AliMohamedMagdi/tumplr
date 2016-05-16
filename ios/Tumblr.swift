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

  func creds() -> NSDictionary {
    let file = NSBundle.mainBundle().pathForResource("keys", ofType: "plist")
    let keys = NSDictionary(contentsOfFile: file!)
    return keys!
  }

  func authenticate() {
    let credentials = creds()
    let oauthswift = OAuth1Swift(
      consumerKey:    credentials["key"]! as! String,
      consumerSecret: credentials["sec"]! as! String,
      requestTokenUrl: "http://www.tumblr.com/oauth/request_token",
      authorizeUrl:    "http://www.tumblr.com/oauth/authorize",
      accessTokenUrl:  "http://www.tumblr.com/oauth/access_token"
    )
    oauthswift.authorizeWithCallbackURL( NSURL(string: "lune://oauth-callback")!, success: {
      credential, response, parameters in
      print("authorizeWithCallbackURL???????????????????")
      print(credential)
      }, failure: { error in
        print(error.localizedDescription)
    })
  }
  
}