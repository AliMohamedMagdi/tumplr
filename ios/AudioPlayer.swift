//
//  AudioPlayer.swift
//  lunatune
//
//  Created by Andrew Kwon on 4/3/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation

/**
 *  AudioPlayer - Stream audio from a URI
 */

@objc(AudioPlayer)

class AudioPlayer: NSObject {
  
  @objc func play(uri: String) -> Void {
    // Got URI here?
    print("Received uri: \(uri)")
  }
  
}