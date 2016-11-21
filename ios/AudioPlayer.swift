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
  
  @objc func play(_ uri: String) -> Void {
    let audioURL = URL(string: uri)!
    player = AVPlayer(url: audioURL)
    player.play()
  }
  
  @objc func pause() -> Void {
    player.pause()
  }
  
  func callback(_ finished : Bool) -> Void {
    print("Finished seeking: \(finished)")
  }
  
  @objc func seek(_ seconds: Int) -> Void {
    let preferredTimeScale : Int32 = (player.currentItem?.asset.duration.timescale)!
    let seektime = CMTimeMakeWithSeconds(Double(seconds), preferredTimeScale)
    player.seek(to: seektime, completionHandler: callback)
  }
  
}
