//
//  AudioPlayer.swift
//  lunatune
//
//  Created by Andrew Kwon on 4/3/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import AVFoundation

/**
 *  AudioPlayer - Stream audio from a URI
 */

@objc(AudioPlayer)

class AudioPlayer: NSObject {
  
  var player: AVPlayer!

  @objc func play(uri: String) -> Void {
    // Got URI here?
    print("Received uri: \(uri)")

    let audioURL = NSURL(string: uri)!
    player = AVPlayer(URL: audioURL)
    player.play();
  }
}